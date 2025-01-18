import fetch from 'node-fetch';
import xml2js from 'xml2js';
import cron from 'node-cron';
import { supabase } from '../lib/supabase.js';

const ARXIV_API_URL = 'http://export.arxiv.org/api/query';
const CATEGORIES = {
  'quant-ph': 'physics:quant-ph',
  'hep': 'physics:hep-th',
  'cond-mat': 'physics:cond-mat',
  'gr-qc': 'physics:gr-qc',
  'nucl': 'physics:nucl-th',
  'math-ph': 'physics:math-ph',
  'class-ph': 'physics:class-ph'
};

async function fetchArxivArticles(category) {
  const query = `search_query=cat:${category}&sortBy=submittedDate&sortOrder=descending&max_results=5`;
  const response = await fetch(`${ARXIV_API_URL}?${query}`);
  const xml = await response.text();
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  return result.feed.entry || [];
}

async function processArticle(article, categoryId) {
  const arxivId = article.id[0].split('/').pop();
  const title = article.title[0];
  const abstract = article.summary[0];
  const published = new Date(article.published[0]);

  // Check if article already exists
  const { data: existingArticle } = await supabase
    .from('articles')
    .select('id')
    .eq('arxiv_id', arxivId)
    .single();

  if (existingArticle) {
    console.log(`Article ${arxivId} already exists, skipping...`);
    return;
  }

  // Create initial summary (this will be enhanced with AI later)
  const summary = abstract;

  // Insert new article
  const { error } = await supabase
    .from('articles')
    .insert({
      arxiv_id: arxivId,
      title,
      abstract,
      summary,
      category_id: categoryId,
      published_date: published.toISOString().split('T')[0]
    });

  if (error) {
    console.error(`Error inserting article ${arxivId}:`, error);
  } else {
    console.log(`Successfully processed article ${arxivId}`);
  }
}

async function scrapeArxiv() {
  console.log('Starting arXiv scraping...');

  // Get categories from database
  const { data: categories, error: categoryError } = await supabase
    .from('categories')
    .select('id, slug');

  if (categoryError) {
    console.error('Error fetching categories:', categoryError);
    return;
  }

  // Process each category
  for (const category of categories) {
    console.log(`Processing category: ${category.slug}`);
    const arxivCategory = CATEGORIES[category.slug];
    
    if (!arxivCategory) {
      console.log(`No arXiv mapping for category ${category.slug}, skipping...`);
      continue;
    }

    try {
      const articles = await fetchArxivArticles(arxivCategory);
      console.log(`Found ${articles.length} articles for ${category.slug}`);
      
      for (const article of articles) {
        await processArticle(article, category.id);
      }
    } catch (error) {
      console.error(`Error processing category ${category.slug}:`, error);
    }
  }

  console.log('Finished arXiv scraping');
}

// Schedule the scraper to run every day at 6 AM
cron.schedule('0 6 * * *', scrapeArxiv);

// Run immediately on startup
scrapeArxiv();
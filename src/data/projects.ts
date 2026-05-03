export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  org: string;
  year: string;
  href?: string;
  image?: string;
  color?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'MGT-001',
    title: 'Assortment Planning AI',
    description: 'FastAPI + GPT-4o pipeline reducing token usage 1,200× and saving 14,800 hours across large-scale plans.',
    tech: ['FastAPI', 'React', 'GPT-4o', 'CosmosDB'],
    org: 'Walmart Global Tech',
    year: '2025',
    color: 'var(--red)',
    featured: true,
  },
  {
    id: 'MGT-002',
    title: 'Genomic Age Prediction',
    description: 'scBasset CNN adapted with TensorFlow + R to predict cell age from single-cell ATAC-seq embeddings.',
    tech: ['TensorFlow', 'Python', 'R', 'scBasset'],
    org: 'Singh Lab, Brown University',
    year: '2025',
    color: 'var(--blue)',
    featured: true,
  },
  {
    id: 'MGT-003',
    title: 'DL for Interpretability',
    description: 'Control vectors + Double Machine Learning to evaluate interpretability of deep learning models in social science.',
    tech: ['TensorFlow', 'Python', 'Causal Inference'],
    org: 'Brown University',
    year: '2024',
    color: 'var(--olive)',
    featured: true,
  },
  {
    id: 'MGT-004',
    title: 'Census OCR Pipeline',
    description: 'AI-assisted OCR pipeline to digitize historical U.S. Census records for socioeconomic research accessibility.',
    tech: ['Python', 'ML', 'OCR', 'Text Recognition'],
    org: 'Anna Aizer Lab, Brown University',
    year: '2025',
    color: '#3a2a1a',
  },
  {
    id: 'MGT-005',
    title: 'Serre Lab Website',
    description: 'Redesigned neuro-AI research lab website using Figma and React, with science communication content.',
    tech: ['React', 'Figma', 'CSS'],
    org: 'Serre Lab, Brown University',
    year: '2024–2025',
    color: '#1a2a2a',
  },
  {
    id: 'MGT-006',
    title: 'HPC GPU Acceleration',
    description: 'Deployed NVIDIA Parabricks on HPC cluster via Docker, reducing genomics pipeline runtime from 3h to 30min.',
    tech: ['Docker', 'NVIDIA Parabricks', 'HPC'],
    org: 'CCV, Brown University',
    year: '2024',
    color: '#1e1a2e',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

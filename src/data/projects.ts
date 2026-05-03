export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  org?: string;
  year: string;
  href?: string;
  image?: string;
  color?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'MGT-001',
    title: 'DL for Interpretability',
    description: 'Control vectors + Double Machine Learning to evaluate interpretability of deep learning models in social science.',
    tech: ['TensorFlow', 'Python', 'Causal Inference'],
    year: '2024',
    href: 'https://github.com/monoguitari/social-science-dl-final',
    color: 'var(--olive)',
    featured: true,
  },
  {
    id: 'MGT-002',
    title: 'Randomized NLA',
    description: 'Implementations and experiments for the Applied Mathematics Directed Reading Program on randomized numerical linear algebra.',
    tech: ['Python', 'Jupyter', 'NumPy'],
    year: '2024',
    href: 'https://github.com/monoguitari/randomized-numerical-linear-algebra',
    featured: true,
  },
  {
    id: 'MGT-003',
    title: 'Nurse Digitization',
    description: 'Python pipeline for digitizing handwritten nurse records.',
    tech: ['Python', 'OCR'],
    year: '2024',
    href: 'https://github.com/monoguitari/nurse-digitization',
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

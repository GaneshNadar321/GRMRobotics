import Link from 'next/link';

const CategoryIcon = ({ slug }: { slug: string }) => {
  if (slug === 'beginner-kits') {
    return (
      <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
        <path d="M50 20L60 40H40L50 20Z" fill="currentColor"/>
        <circle cx="50" cy="55" r="8" fill="currentColor"/>
        <rect x="35" y="70" width="30" height="8" rx="2" fill="currentColor"/>
        <path d="M30 78L35 85H65L70 78" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }
  
  if (slug === 'intermediate-kits') {
    return (
      <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
        <rect x="30" y="25" width="40" height="30" rx="3" fill="currentColor"/>
        <circle cx="42" cy="40" r="4" fill="white"/>
        <circle cx="58" cy="40" r="4" fill="white"/>
        <path d="M35 50L45 55L35 60M65 50L55 55L65 60" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="25" y="60" width="50" height="8" rx="2" fill="currentColor"/>
        <circle cx="35" cy="75" r="6" fill="currentColor"/>
        <circle cx="65" cy="75" r="6" fill="currentColor"/>
      </svg>
    );
  }
  
  // Advanced
  return (
    <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
      <rect x="35" y="20" width="30" height="25" rx="2" fill="currentColor"/>
      <circle cx="43" cy="32" r="3" fill="white"/>
      <circle cx="57" cy="32" r="3" fill="white"/>
      <path d="M40 38L50 42L60 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <rect x="30" y="48" width="40" height="20" rx="2" fill="currentColor"/>
      <path d="M35 55H45M55 55H65M35 60H45M55 60H65" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="38" cy="75" r="5" fill="currentColor"/>
      <circle cx="62" cy="75" r="5" fill="currentColor"/>
      <path d="M25 70L30 75L25 80M75 70L70 75L75 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

const categories = [
  {
    name: 'Beginner Kits',
    slug: 'beginner-kits',
    description: 'Perfect for students just starting their robotics journey',
    gradient: 'from-green-400 to-green-600',
    badge: { text: 'Start Here', color: 'bg-green-100 text-green-700' },
  },
  {
    name: 'Intermediate Kits',
    slug: 'intermediate-kits',
    description: 'Ready for more challenges and complex projects',
    gradient: 'from-blue-400 to-blue-600',
    badge: { text: 'Level Up', color: 'bg-blue-100 text-blue-700' },
  },
  {
    name: 'Advanced Kits',
    slug: 'advanced-kits',
    description: 'Professional-grade robotics for experts',
    gradient: 'from-purple-400 to-purple-600',
    badge: { text: 'Expert', color: 'bg-purple-100 text-purple-700' },
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Shop by Skill Level</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect robotics kit based on your experience level
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`h-56 bg-gradient-to-br ${category.gradient} flex flex-col items-center justify-center text-white relative`}>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.badge.color}`}>
                    {category.badge.text}
                  </span>
                </div>
                <div className="transform group-hover:scale-110 transition-transform duration-300 mb-3">
                  <CategoryIcon slug={category.slug} />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 text-sm px-6 text-center">
                  {category.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link 
            href="/categories" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            View All Categories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

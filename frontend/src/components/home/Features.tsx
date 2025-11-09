import { Package, Video, BookOpen, Award } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Quality Kits',
    description: 'LEGO-style components that are durable and easy to assemble',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for every project',
  },
  {
    icon: BookOpen,
    title: 'User Manuals',
    description: 'Comprehensive PDF manuals with troubleshooting',
  },
  {
    icon: Award,
    title: 'Certified Learning',
    description: 'Educational content aligned with STEM standards',
  },
];

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose GRM Robotics?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { Features } from '@/components/home/Features';
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData';

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grmrobotics.com';
  
  return (
    <>
      <OrganizationSchema
        name="GRM Robotics"
        url={baseUrl}
        logo={`${baseUrl}/logo.jpg`}
        description="Student-friendly robotics kits with LEGO-style components, complete with video tutorials and user manuals for hands-on STEM learning."
        contactPoint={{
          telephone: "+91-XXXXXXXXXX",
          contactType: "Customer Service",
          email: "info@grmrobotics.com"
        }}
      />
      <WebsiteSchema
        name="GRM Robotics"
        url={baseUrl}
        description="Build, learn, and innovate with student-friendly robotics kits"
        potentialAction={{
          target: `${baseUrl}/products?search={search_term_string}`,
          queryInput: "required name=search_term_string"
        }}
      />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
    </>
  );
}

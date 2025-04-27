
import React from 'react';
import Layout from '@/components/Layout';
import { Lyre } from 'lucide-react';
import Newsletter from '@/components/Newsletter';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">About Orphaleia</h1>
          <div className="decorative-line"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">Our Story</h2>
            <div className="decorative-line"></div>
            <p className="my-4 text-lg">
              Orphaleia was born from a profound love of literature and a deep appreciation for 
              the timeless wisdom of Greek mythology, poetry, and song. Our name draws inspiration from 
              Orpheus, the legendary musician whose melodies could charm even the stones, and Thalia, 
              the muse of poetry—symbolizing our commitment to books that resonate with both 
              musical harmony and poetic insight.
            </p>
            <p className="my-4">
              Founded in 2022 by a collective of literature enthusiasts, Orphaleia is more than just 
              an online bookshop. We are curators of literary experiences that bridge ancient traditions 
              with contemporary perspectives. Each title in our carefully curated collection has been 
              selected for its ability to transport, transform, and transcend.
            </p>
            <p className="my-4">
              We believe that books are not mere objects but vessels of knowledge, wonder, and human 
              connection. Through our platform, we aim to create a community where readers can discover 
              works that speak to the mind and soul—books that echo through time like the 
              melodies of Orpheus.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-softgray rounded-lg p-8 relative z-10">
              <div className="bg-gold/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lyre size={32} className="text-deepblue" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-4">Our Vision</h3>
              <p className="mb-4">
                To create a haven for book lovers where the ancient and modern worlds converge, 
                offering literary treasures that inspire, challenge, and enchant.
              </p>
              
              <h3 className="text-xl font-playfair font-semibold mt-8 mb-4">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-gold w-2 h-2 rounded-full mt-2 mr-3"></span>
                  <span><strong>Literary Excellence:</strong> We champion works of exceptional quality that stand the test of time.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gold w-2 h-2 rounded-full mt-2 mr-3"></span>
                  <span><strong>Cultural Bridge-Building:</strong> We connect readers with diverse literary traditions from around the world.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gold w-2 h-2 rounded-full mt-2 mr-3"></span>
                  <span><strong>Thoughtful Curation:</strong> We personally select each title for its unique voice and perspective.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gold w-2 h-2 rounded-full mt-2 mr-3"></span>
                  <span><strong>Community Connection:</strong> We foster meaningful conversations around literature and ideas.</span>
                </li>
              </ul>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-full h-full border-2 border-gold/30 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gold/20 rounded-full -z-10"></div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">Meet the Team</h2>
          <div className="decorative-line mx-auto"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="text-center">
              <div className="w-40 h-40 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-playfair font-semibold text-xl">Elena Pappas</h3>
              <p className="text-muted-foreground">Founder & Chief Curator</p>
              <p className="mt-3 px-4">With a background in Classical Studies and Modern Literature, Elena brings her passion for timeless stories to Orphaleia.</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-playfair font-semibold text-xl">Marcus Chen</h3>
              <p className="text-muted-foreground">Literary Specialist</p>
              <p className="mt-3 px-4">A published poet with a PhD in Comparative Literature, Marcus helps discover unique literary voices from around the world.</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-playfair font-semibold text-xl">Sophia Rousseau</h3>
              <p className="text-muted-foreground">Community Manager</p>
              <p className="mt-3 px-4">With her background in literary events and community building, Sophia creates connections between books and readers.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </Layout>
  );
};

export default About;

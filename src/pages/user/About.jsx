import React from "react";



const team = [
  { name: "John Doe", role: "Founder & CEO", image: "https://source.unsplash.com/150x150/?man" },
  { name: "Jane Smith", role: "Lead Instructor", image: "https://source.unsplash.com/150x150/?woman" },
  { name: "Alice Johnson", role: "UI/UX Designer", image: "https://source.unsplash.com/150x150/?designer" },
  { name: "Bob Lee", role: "Data Scientist", image: "https://source.unsplash.com/150x150/?developer" },
];

function About() {
  return (
    <div className="font-sans">
   
      

      {/* Team Section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition text-center p-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
}

export default About;

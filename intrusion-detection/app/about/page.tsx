"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Particles } from "@/components/3d/particles";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Madhumitha R",
    description: "4th Year CSE-B",
    role: "Developer",
    image: "/madhu.jpg"
  },
  {
    name: "Mugil S", 
    description: "4th Year CSE-B",
    role: "Developer",
    image: "/mugil.jpg"
  },
  {
    name: "Naveen M",
    description: "4th Year CSE-B", 
    role: "Developer",
    image: "/naveen.jpg"
  }
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="container relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <Particles />
        </div>
        
        <div className="mx-auto max-w-4xl px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-red-500">About Our Team</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-3">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Card className="rounded-lg bg-background/50 backdrop-blur-sm border-none">
                        <CardHeader>
                          <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={300}
                              height={200}
                              className="object-contain"
                            />
                          </div>
                          <CardTitle className="text-xl font-semibold text-red-500">{member.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-2">{member.description}</p>
                          <p className="text-gray-400">{member.role}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
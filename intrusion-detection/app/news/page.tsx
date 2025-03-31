"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Particles } from "@/components/3d/particles";
import { NewsFeed } from "@/components/news-feed";

export default function NewsPage() {
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
                  <CardTitle className="text-2xl font-bold text-red-500">Cybersecurity News</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>
                  Stay updated with the latest news about cybersecurity, intrusion detection, and prevention measures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsFeed />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
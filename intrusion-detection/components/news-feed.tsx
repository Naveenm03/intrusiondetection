"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NewsItem {
  title: string
  description: string
  url: string
  publishedAt: string
  source: {
    name: string
  }
  urlToImage?: string
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=(cybersecurity OR "intrusion detection" OR "network security" OR "cyber attack" OR "data breach" OR "ransomware" OR "malware" OR "firewall" OR "IDS" OR "IPS")&language=en&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
      )
      const data = await response.json()

      if (data.status === "ok") {
        setNews(data.articles)
      } else {
        setError("Failed to fetch news")
      }
    } catch (err) {
      setError("Error fetching news")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const filterNews = (category: string) => {
    if (category === "all") return news
    return news.filter((item) => {
      const title = item.title.toLowerCase()
      const description = item.description?.toLowerCase() || ""

      switch (category) {
        case "attacks":
          return (
            title.includes("attack") ||
            description.includes("attack") ||
            title.includes("breach") ||
            description.includes("breach") ||
            title.includes("ransomware") ||
            description.includes("ransomware")
          )
        case "prevention":
          return (
            title.includes("prevent") ||
            description.includes("prevent") ||
            title.includes("protect") ||
            description.includes("protect") ||
            title.includes("security") ||
            description.includes("security")
          )
        case "detection":
          return (
            title.includes("detect") ||
            description.includes("detect") ||
            title.includes("ids") ||
            description.includes("ids") ||
            title.includes("ips") ||
            description.includes("ips")
          )
        default:
          return true
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={fetchNews} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Cybersecurity News</h2>
        <Button onClick={fetchNews} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="attacks">Attacks</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
          <TabsTrigger value="detection">Detection</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filterNews(activeTab).map((item, index) => (
                <motion.div
                  key={`${item.url}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover">
                    {item.urlToImage && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={item.urlToImage || "/placeholder.svg"}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                      <CardDescription>
                        {new Date(item.publishedAt).toLocaleDateString()} • {item.source.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.description}</p>
                      <Button variant="outline" className="w-full" onClick={() => window.open(item.url, "_blank")}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

interface InfoCardProps {
  title: string
  description: string
  items: string[]
}

export function InfoCard({ title, description, items }: InfoCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="mb-2 font-semibold">Preventive Measures:</h3>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


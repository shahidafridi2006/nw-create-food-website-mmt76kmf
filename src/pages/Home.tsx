import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { UtensilsCrossed, Truck, Clock, Star, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import DishCard from '@/components/DishCard'
import type { Dish } from '@/types'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Fresh Ingredients',
    description: 'We source the finest local ingredients for authentic flavors',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Hot food delivered to your door in 30 minutes or less',
  },
  {
    icon: Clock,
    title: 'Open Daily',
    description: 'Available 7 days a week from 10 AM to 10 PM',
  },
]

export default function Home() {
  const { data: featuredDishes, isLoading } = useQuery({
    queryKey: ['dishes', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dishes')
        .select('*, category:categories(*)')
        .eq('is_featured', true)
        .limit(6)
      
      if (error) throw error
      return data as Dish[]
    },
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data
    },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Delicious Food,
              <br />
              <span className="text-secondary-300">Delivered Fresh</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto animate-slide-up">
              Experience culinary excellence with our handcrafted dishes made from locally-sourced ingredients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/menu" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                View Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Explore Our Menu</h2>
              <p className="section-subtitle">Browse by category to find your favorites</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/menu?category=${category.id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square"
                >
                  <img
                    src={category.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e5c8?w=400'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Dishes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Dishes</h2>
            <p className="section-subtitle">Chef's special selections for you</p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredDishes && featuredDishes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured dishes available at the moment.</p>
              <Link to="/menu" className="btn-primary mt-4">
                View Full Menu
              </Link>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-outline">
              View Full Menu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from food lovers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                rating: 5,
                comment: 'The best food delivery experience I\'ve ever had. Fresh, delicious, and always on time!',
              },
              {
                name: 'Michael Chen',
                rating: 5,
                comment: 'Amazing quality ingredients and the flavors are incredible. Highly recommend the pasta dishes.',
              },
              {
                name: 'Emily Davis',
                rating: 5,
                comment: 'Their customer service is outstanding, and the food quality is consistently excellent.',
              },
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.comment}</p>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl text-secondary-100 mb-8">
            Join thousands of happy customers enjoying delicious meals every day
          </p>
          <Link to="/menu" className="btn bg-white text-secondary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Start Your Order
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">CONTACT</h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl">
          Let's collaborate on your next project. Drop me a message and I'll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className="p-4 bg-green-800 border border-green-600 rounded-lg text-green-100">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-400 leading-relaxed">
                I'm always interested in new opportunities, collaborations, and interesting projects. 
                Whether you need help with development, have a creative idea, or just want to chat about tech, 
                feel free to reach out.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Response Time</h4>
                <p className="text-gray-400 text-sm">Usually within 24-48 hours</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Location</h4>
                <p className="text-gray-400 text-sm">Available for remote work worldwide</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Social</h4>
                <div className="flex space-x-4 text-sm">
                  <a href="#" className="text-yellow-400 hover:underline">LinkedIn</a>
                  <a href="#" className="text-yellow-400 hover:underline">GitHub</a>
                  <a href="#" className="text-yellow-400 hover:underline">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
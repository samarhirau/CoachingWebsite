export function StatsSection() {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Served" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Trusted Across India</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Our commitment to excellence has earned the trust of thousands of customers nationwide.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

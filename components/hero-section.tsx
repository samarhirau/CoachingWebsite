export function HeroSection() {
  return (
    <section
      className="relative h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/modern-office-work.png')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Attention RID Users,</h1>

          <div className="mb-8">
            <p className="text-xl mb-4">
              Empowering Nation, <span className="text-blue-300 font-semibold">Research Innovation & Discovery</span> |
              Research Paper Submissions
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Our Highlights:</h3>

              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-300 font-bold mr-3">1.</span>
                  <p>
                    You can use RID Portal to submit and publish <span className="text-blue-300">startup</span> and{" "}
                    <span className="text-blue-300">innovative ideas</span> direct from your device to internet world.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-300 font-bold mr-3">2.</span>
                  <p>
                    No need to worry about verification we will check and suggest you all necessary changes on time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

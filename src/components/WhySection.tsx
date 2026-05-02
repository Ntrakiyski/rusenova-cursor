import illustration4 from '../../source/images/4.png'

export function WhySection() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={illustration4}
              alt=""
              className="w-full max-w-[420px] lg:max-w-[520px] h-auto opacity-95"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="font-instrumentSans font-bold tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
              Why you need smart systems?
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Check, Phone, Building2 } from "lucide-react"
import eventData from "@/data/full-day-event.json"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function FullDaySection() {
  const targetDate = new Date(eventData.date).getTime()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ]

  return (
    <section id="full-day" className="py-16 md:py-24 bg-[var(--brand-navy)] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)]/90 via-[var(--brand-slate)]/50 to-[var(--brand-navy)]/90" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 text-balance">
            {eventData.title}
          </h2>
          <p className="text-[var(--brand-cyan)] text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
            {eventData.subtitle}
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-12 md:mb-16 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {timeUnits.map((unit, index) => (
              <div
                key={unit.label}
                className="glass rounded-xl p-4 sm:p-6 text-center backdrop-blur-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--brand-cyan)] mb-2 tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wider font-medium">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-12 md:mb-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {eventData.plans.map((plan, index) => (
              <div
                key={plan.id}
                className="glass rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Plan Header */}
                <div
                  className="rounded-t-xl -mx-6 -mt-6 px-6 py-4 mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}dd, ${plan.color}99)`,
                  }}
                >
                  <h3 className="text-white font-bold text-center uppercase text-sm">{plan.type}</h3>
                  <p className="text-white/90 font-semibold text-center text-xs mt-1">{plan.category}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--brand-green)] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="text-center pt-4 border-t border-white/10">
                  {plan.promoPrice ? (
                    <div>
                      <div className="text-white/50 text-sm line-through mb-1">S/ {plan.price}</div>
                      <div className="text-3xl font-bold text-[var(--brand-cyan)]">S/ {plan.promoPrice}</div>
                      <div className="text-[var(--brand-green)] text-xs font-semibold mt-1 uppercase">Precio Promo</div>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-white">S/ {plan.price}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Promo Banner */}
          <div className="mt-8 max-w-2xl mx-auto glass rounded-xl p-6 backdrop-blur-md animate-pulse-slow">
            <div className="text-center">
              <p className="text-[var(--brand-cyan)] font-bold text-lg sm:text-xl mb-3">🎉 APROVECHA NUESTRA PROMO</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="glass rounded-lg px-6 py-3 backdrop-blur-sm">
                  <p className="text-white/70 text-xs uppercase mb-1">Estudiante Básico</p>
                  <p className="text-[var(--brand-green)] font-bold text-xl">S/. 20.00</p>
                </div>
                <div className="glass rounded-lg px-6 py-3 backdrop-blur-sm">
                  <p className="text-white/70 text-xs uppercase mb-1">Estudiante Completo</p>
                  <p className="text-[var(--brand-green)] font-bold text-xl">S/. 30.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="animate-fade-in-up" style={{ animationDelay: "700ms" }}>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Métodos de Pago</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {eventData.paymentMethods.map((method, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 backdrop-blur-md hover:border-[var(--brand-cyan)]/30 border border-transparent transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {method.icon === "phone" ? (
                    <Phone className="w-6 h-6 text-[var(--brand-cyan)]" />
                  ) : (
                    <Building2 className="w-6 h-6 text-[var(--brand-cyan)]" />
                  )}
                  <h4 className="text-white font-bold text-lg">{method.name}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-white/70">{method.contact}</p>
                  {method.number && <p className="text-[var(--brand-cyan)] font-mono font-semibold">{method.number}</p>}
                  {method.account && (
                    <div>
                      <p className="text-white/50 text-xs">Cuenta:</p>
                      <p className="text-white/80 font-mono">{method.account}</p>
                    </div>
                  )}
                  {method.cci && (
                    <div>
                      <p className="text-white/50 text-xs">CCI:</p>
                      <p className="text-white/80 font-mono text-xs break-all">{method.cci}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

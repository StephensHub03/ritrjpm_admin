import { achievements } from '../data/constants'

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Institution achievements">
      <div>{[...achievements, ...achievements].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
    </section>
  )
}

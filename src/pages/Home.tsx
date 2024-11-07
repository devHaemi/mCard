import Top from '@/components/shared/Top'
import AdBanners from '@/components/home/AdBanners'

export default function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요."
      />
      <AdBanners />
    </div>
  )
}

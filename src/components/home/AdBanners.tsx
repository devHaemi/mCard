import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import { getAdBanners } from '@/remote/adBanner'
import { colors } from '@/styles/colorPalette'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'

import 'swiper/css'

function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanners())

  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold={true} typography="t7">
            &nbsp;
          </Text>
          <Text>&nbsp;</Text>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.link}>
              <Flex direction="column" css={bannerContainerStyles}>
                <Text bold={true} typography="t7">
                  {banner.title}
                </Text>
                <Text>{banner.description}</Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.gray};
  border-radius: 4px;
`

const Container = styled.div`
  padding: 24px;
`

export default AdBanners

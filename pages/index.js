import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Flex, Box, Text, Button } from '@chakra-ui/react'

import { baseUrl, fetchApi } from '../utils/fetchApi'
import Property from '../components/Property'

const Banner = ({ purpose, title1, title2, desc1, desc2, linkName, buttonText, imgUrl  }) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image 
        src={imgUrl}
        width={500}
        height={300}
        alt="Banner"
      />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text color="gray.500" fontSize="3xl" fontWeight="bold">
          {title1} <br /> {title2}
        </Text>
        <Text fontSize="lg" color="gray.700" paddingBlock="3">
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize="xl">
          <Link href={linkName}>
            {buttonText}
          </Link>
        </Button>
      </Box>
    </Flex>
  )
}

export default function Home({ propertiesForSale, propertiesForRent }) {

  return (
    <Box>
      <Banner 
        purpose="RENT A HOME" 
        title1="Rental Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property, index) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner 
        purpose="BUY A HOME"
        title1="Fine, Buy & Own your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sell"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property, index) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}
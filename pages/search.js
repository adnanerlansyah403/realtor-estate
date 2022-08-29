import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { Flex, Box, Text, Icon, filter } from "@chakra-ui/react"
import { BsFilter } from "react-icons/bs"
import { FiCircle, FiXCircle } from "react-icons/fi"

import SearchFilters from './../components/SearchFilters';
import Property from './../components/Property';

import noresults from "../assets/noresult.svg"
import { baseUrl, fetchApi } from './../utils/fetchApi';
import { filterData, getFilterValues } from './../utils/filterData';

const Search = ({ properties }) => {

  const [searchFilters, setSearchFilters] = useState(false);
  const [queries, setQueries] = useState([])

  const router = useRouter();
  const { query } = router;

  useEffect(() => {

    setQueries(query)

  }, [query])

  const deleteFilter = (item) => {
    const path = router.pathname;

    const { query } = router;

    for (let index = 0; index < Object.keys(query).length; index++) {
      if (query[Object.keys(query)[index]]) {
        delete query[Object.keys(query)[index]];

        // if (select) {
        //   select.value = '';
        // }
      }
    }
    

    let select = document.querySelector(`select[name=${item}]`);

    select.value = ''
    
    router.push({ pathname: path, query: query })
  }

  return (
    <Box>
        <Flex
          cursor="pointer"
          bg="gray.100"
          borderBottom="1px"
          borderColor="gray.200"
          p="2"
          fontWeight="black"
          fontSize="lg"
          justifyContent="center"
          alignItems="center"
          onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
        >
          <Text>Search Property By Filters</Text>
          <Icon paddingLeft="2" w="7" as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}
        <Flex flexWrap="wrap" gap="3" marginBlock="10px">
          {Object.keys(queries).map((item) => (
            <Flex key={item} justifyContent="center" alignItems="center" gap="2" p="4" borderRadius="5" bg="blue.300" color="white">
              <Text _hover={{ color: "gray.300", transition: ".2s ease" }} onClick={() => deleteFilter(item)}>
                <FiXCircle fontSize="24" cursor="pointer"  />
              </Text>
              <Text fontSize="16">
                {item}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Text fontSize="2xl" p="4" fontWeight="bold">
          Properties {router.query.purpose}
        </Text>
        <Flex flexWrap="wrap">
          {properties.map((property) => <Property property={property} key={property.title} />)}
        </Flex>
        {properties.length === 0 && (
          <Flex justifyContent="center" alignItems="center" flexDirection="column" marginBlock="5">
            <Image 
              alt="no results"
              src={noresults}
            />
            <Text fontSize="2xl" marginTop="3" >
              No Results Found
            </Text>
          </Flex>
        )}
    </Box>
  )
}

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
   
  return {
    props: {
      properties: data?.hits,
    }
  }
}

export default Search
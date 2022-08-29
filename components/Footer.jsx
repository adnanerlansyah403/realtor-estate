import React from 'react'
import { Box, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box flex="row" textAlign="center" fontWeight="bold" p="5" color="gray.600" borderTop="1px" borderColor="gray.100">
        2022 <span style={{ color: "#22c55e" }}>Realtor</span>, Inc.
    </Box>
  )
}

export default Footer
import { Flex, Stack, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import LoginButton from '../components/LoginButton'
import SignupForm from '../components/SignupForm'

const Home: NextPage = () => {
  return (
    <Flex minHeight={"100vh"} alignSelf={'center'} w={"100vw"} justifyContent={"center"}>
      <Stack align={'center'} justify={'center'}>
        <Box >
          <LoginButton />
        </Box>
      </Stack>
    </Flex >
  )
}

export default Home

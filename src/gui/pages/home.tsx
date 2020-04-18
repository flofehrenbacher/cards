import React from 'react'
import { NicknameForm } from '../components/nickname-form/nickname-form'
import { Layout } from '../layout'

export function Home() {
  return (
    <Layout>
      <NicknameForm css={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} />
    </Layout>
  )
}

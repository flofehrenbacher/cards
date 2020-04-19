import React from 'react'
import { NicknameForm } from '../../nickname-form/nickname-form'
import { Layout } from '../../../layout'

export function Home({ onSubmitNewPlayer }: { onSubmitNewPlayer: (name: string) => void }) {
  return (
    <Layout>
      <NicknameForm
        onSubmitNewPlayer={onSubmitNewPlayer}
        css={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      />
    </Layout>
  )
}

import { Metadata } from 'next'

import SettingDetail from './SettingDetail'

export const metadata: Metadata = {
	title: 'Настройки'
}

export default function SettingsDetailPage({
	params
}: {
	params: { id: string }
}) {
	return <SettingDetail id={params.id} />
}

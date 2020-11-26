import { Details } from "../details/_details"

import { useRouter } from 'next/router'
import { TrackableType } from "@types"

export default function ShowDetails() {
    const router = useRouter()
    const { id } = router.query

    return <Details type={TrackableType.Show} id={id} />
}

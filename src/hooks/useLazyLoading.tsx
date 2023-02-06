import React from 'react'

type useLazyLoadingProps = {}

const useLazyLoading = () => {
    const [fetching, setFetching] = React.useState<boolean>(false)

    const loaded = () => {
        setFetching(false)
    }

    const scrollHandler = React.useCallback((e: any) => {
        if (
            e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) <
            100
        ) {
            setFetching(true)
        }
    }, [])

    React.useEffect(() => {
        document.body.addEventListener('scroll', scrollHandler)
        return () => {
            document.body.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return {fetching, loaded}
}

export default useLazyLoading

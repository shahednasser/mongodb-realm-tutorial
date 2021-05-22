import React from 'react'

const MongoContext = React.createContext({
    app: null,
    client: null,
    user: null,
    setApp: () => {},
    setClient: () => {},
    setUser: () => {}
})

export default MongoContext
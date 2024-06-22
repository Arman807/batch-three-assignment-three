/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config()


export default{
    port:process.env.PORT,
    db_url:process.env.DB_URL
}
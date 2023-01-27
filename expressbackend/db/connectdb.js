import mssql from 'mssql';
const connectDB = async (NAME) => {
    try {
        let partyName;
        const DB_OPTIONS = {
            user: 'ETest',
            password: 'Power@123',
            server: '103.131.93.13',
            port: 1433,
            database: 'ETest' ,
            options: {
                encrypt: false,
                trustServerCertificate: true,
            }
        }
        await mssql.connect(DB_OPTIONS);
        const result = await mssql.query`select * from dbo.PARTY_MASTER`
        partyName = result.recordsets[0].map(obj => obj.PARTY_NAME);
        console.log('Connected Successfully');
    } catch (err) {
        console.log(err);
    }
}

export default connectDB
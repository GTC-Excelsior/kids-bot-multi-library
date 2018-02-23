require('dotenv').load()
const azure = require('azure-storage');

// =========================================================
// Azure Table Setup
// =========================================================
const tableSvc = azure.createTableService(process.env.AZURE_STORE_CONNSTR);

module.exports = {
  tableSvc: tableSvc,

  startScriptOnlyOnRecognizedEmail: (session, ifExists, ifNotExists, next) => {
    const query = new azure.TableQuery()
      .top(1)
      .where('RowKey eq ?', session.userData.email)

    tableSvc.queryEntities('Users', query, null, ((error, result, response) => {
      if (error) {
        console.log(error)
        return
      }

      if (result.entries.length > 0) {
        // The email exists if the JSON response is > 0
        ifExists(next)
      } else {
        ifNotExists()
      }
    }))
  }
}

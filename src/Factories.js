const uuidv4 = require('uuid/v4')


module.exports.createuser = (username,sid)=>{
	const data = {
			id:uuidv4(),
			name:username,
			socketID: sid
	}
	return data
}

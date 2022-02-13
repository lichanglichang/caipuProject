export default function GetC(key:any) {
	for(var i=0;i<key.length;i++){
		var str = "";
		var str2 = ""
		if(key[i].includes("username")){
			str = key[i];
			str2 = str.trim().substring(9);
			return str2;
		}
	}
	return ""
}
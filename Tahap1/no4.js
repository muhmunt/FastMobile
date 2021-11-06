function cut(cutiBersama, tglMasuk, tglCuti, durasiCuti){
  //   14 = cuti kantor
    let cutiPribadi = 14 - cutiBersama;
    let masuk = new Date(tglMasuk).valueOf();
    let tgCuti = new Date(tglCuti).valueOf();
    let bolehCuti = masuk + 180 * 24 * 60 * 60 * 1000;
    var lastDayofYear = new Date(new Date().getUTCFullYear(), 11, 31).valueOf();
  
    let totalHari = Math.round((lastDayofYear - bolehCuti)/(1000*60*60*24))
    let canGetDay = totalHari / 365 * cutiPribadi
    let getDay = Math.floor(canGetDay)
    
    if(tgCuti < bolehCuti){
      return {
        status: false,
        message:"Karena belum 180 hari sejak tanggal join karyawan"
      }
    }
    
    if(getDay < durasiCuti){
      return {
        status: false,
        message:" Karena hanya boleh mengambil "+ getDay +" hari cuti"
      }
    }
    
    return true
  
  }
  
  console.log(cut(7, "2021-05-01", "2021-11-05", 2))
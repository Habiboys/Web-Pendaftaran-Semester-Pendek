const {Subject}= require('../models/index')

const tambahmatkul = async (req,res)=>{
    const{kode, namamatkul, dosen, semester, sks}=req.body

try {
    const carimatkul= await Subject.findByPk(kode)
        if(carimatkul){
            res.status(400).json({success:false, message: "Kode telah ada sebelumnya"})
        }
        const matakul= await Subject.create({
            name:namamatkul, 
            lecturerNip:dosen,
            semester:semester,
            credit:sks,
            id:kode,
            status:"active"
        })
        if(matakul){
            res.status(200).json({success:true, message: "Mata kuliah telah berhasil ditambahkan"})
        }
} catch (error) {
    console.log(error)
    res.status(500).json({success:false, message: "Server Error"})
}
}

const hapusmatkul = async (req,res)=>{
    const{id}= req.params
    try {
        const carimatkul = await Subject.findByPk(id)

        if(!carimatkul) {
            return res.status(400).json({success:false, message:"Mata Kuliah Tidak Ditemukan"})
        }
        await carimatkul.destroy()
        res.status(200).json({success:true, message:"Mata Kuliah Berhasil Dihapus"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: "Server Error"})
    }
}

module.exports ={
    tambahmatkul,
    hapusmatkul,
}
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    tipo: { type: String, required: true },
    adoptado: { type: Boolean, default: false },
    propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

export const PetModel = mongoose.model('Pet', petSchema);
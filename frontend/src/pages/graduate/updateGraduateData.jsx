import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import HandleAlert from '../../components/alert/handleAlert';
import { getAccessToken, setUser } from '../../utils/cookieUtils';

const UpdateGraduateData = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [alertComponent, showAlert] = HandleAlert();
    const [fullUserData, setFullUserData] = useState({});

    const apiUrl = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/graduate/user/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getAccessToken();
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const data = response.data;
                setFullUserData(data);

                // Pre-fill form fields
                setValue('address', data.address);
                setValue('personalEmail', data.personalEmail);
                setValue('phone', data.phone);
                setValue('civilStatus', data.civilStatus);
                setValue('workPlace', data.workPlace);
                setValue('job', data.job);
                setValue('phoneWork', data.phoneWork);
                
            } catch (error) {
                console.error("Error fetching data", error);
                showAlert({ 
                    type: 'error', 
                    content: 'No se pudieron cargar sus datos actuales.' 
                });
            }
        };
        fetchData();
    }, [setValue, apiUrl]);

    const onSubmit = async (formData) => {
        setSubmitting(true);
        showAlert({ type: 'waiting', content: 'Guardando información...' });
        try {
            const token = getAccessToken();
            
            // Merge original data with form updates
            // We ensure we send back all fields the backend requires
            const payload = {
                ...fullUserData,
                ...formData,
                userID: fullUserData.userID, // Explicitly ensure ID is present if needed by frontend logic, though middleware handles it
                previousEmail: fullUserData.email, // Required so backend knows if email changed
            };

            await axios.put(apiUrl, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local cookie cache
            setUser(payload);
            
            showAlert({ 
                type: 'verification', 
                content: 'Datos actualizados exitosamente' 
            });
            
             setTimeout(() => {
                navigate('/Graduate/Profile');
             }, 2000);

        } catch (error) {
            console.error(error);
            showAlert({ 
                type: 'error', 
                content: 'Hubo un problema al actualizar sus datos.' 
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {alertComponent}
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
                <div className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold text-orange-main">Actualización de Datos</h1>
                    <p className="text-gray-600 mt-2">Mantenga su información de contacto y laboral al día.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Sección Personal */}
                    <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal y Contacto</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Dirección Pasaje/Calle</label>
                                <input 
                                    type="text" 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("address")}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estado Civil</label>
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("civilStatus")}
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Soltero/a">Soltero/a</option>
                                    <option value="Casado/a">Casado/a</option>
                                    <option value="Viudo/a">Viudo/a</option>
                                    <option value="Divorciado/a">Divorciado/a</option>
                                    <option value="Conviviente Civil">Conviviente Civil</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Personal</label>
                                <input 
                                    type="email" 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("personalEmail")}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Teléfono Personal</label>
                                <input 
                                    type="tel" 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("phone")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección Laboral */}
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Laboral</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Lugar de Trabajo (Empresa/Institución)</label>
                                <input 
                                    type="text" 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("workPlace")}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cargo</label>
                                <input 
                                    type="text" 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("job")}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Teléfono Trabajo</label>
                                <input 
                                    type="tel" 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    {...register("phoneWork")}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => navigate('/Graduate/Profile')}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`bg-orange-main text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors font-bold shadow-sm ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default UpdateGraduateData;

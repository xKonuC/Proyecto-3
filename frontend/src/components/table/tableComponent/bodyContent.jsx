import IconOnlyAlert from "../../alert/iconOnlyAlert";

const TbodyContent = ({ itemsLength, length, isLoading, children }) => (
    <>
        {(itemsLength === 0 && isLoading) ? (
            <tr>
                <td colSpan={length} className="h-96">
                    <div className="flex items-center justify-center">
                        <IconOnlyAlert />
                    </div>
                </td>
            </tr>
        ) : (itemsLength === 0 && !isLoading) ? (
            <tr>
                <td colSpan={length} className="h-96">
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-gray-500 text-lg">No hay datos disponibles</p>
                            <p className="text-gray-400 text-sm">No se encontraron registros para mostrar</p>
                        </div>
                    </div>
                </td>
            </tr>
        ) : (
            <>
                {children}
            </>
        )}
    </>
);

export default TbodyContent;


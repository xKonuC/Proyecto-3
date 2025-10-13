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
        ) : (
            <>
                {children}
            </>
        )}
    </>
);

export default TbodyContent;


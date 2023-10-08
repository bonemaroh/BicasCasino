import { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { web3 } from '@/entities/web3';
import { settingsModel } from '@/entities/settings';

export interface SettingsInitProps { };
export const SettingsInit: FC<SettingsInitProps> = props => {

    const [
        queryChains,
        getLocalization
    ] = useUnit([
        web3.queryChains,
        settingsModel.getLocalization
    ]);

    useEffect(() => {
        queryChains();
        getLocalization('english');
    }, []);
    return (<></>)
}
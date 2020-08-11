import { accountService } from '../../_services/account.service';
import { alertService } from '../../_services/alert.service';

export function updateStatus(id, fields){
    accountService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
            })
            .catch(error => {
                alertService.error(error);
});
}
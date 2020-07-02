import { checkIntersect as intersect } from '../helpers/Intersect';
import { HealthcareAuthority } from '../store/types';
import { emitResultDayBins } from '../gps/exposureInfo';

class IntersectService {
  isServiceRunning = false;
  private nextJob: HealthcareAuthority[] | null = null;

  checkIntersect = (
    healthcareAuthorities: HealthcareAuthority[] | null,
    bypassTimer: boolean,
  ): string => {
    if (this.isServiceRunning) {
      this.nextJob = healthcareAuthorities;
      return 'skipped';
    }
    this.isServiceRunning = true;

    intersect(healthcareAuthorities, bypassTimer).then((dayBins) => {
      this.isServiceRunning = false;

      if (this.nextJob) {
        const job = this.nextJob;
        this.nextJob = null;
        this.checkIntersect(job, bypassTimer);
      } else {
        emitResultDayBins(dayBins);
      }
    });

    return 'started';
  };
}

const singleton = new IntersectService();

export default singleton as IntersectService;
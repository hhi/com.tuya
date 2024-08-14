import TuyaOAuth2DriverSensor from '../../lib/TuyaOAuth2DriverSensor';
import { TuyaDeviceResponse, TuyaDeviceSpecificationResponse } from '../../types/TuyaApiTypes';
import { DEVICE_CATEGORIES } from '../../lib/TuyaOAuth2Constants';
import { ListDeviceProperties } from '../../lib/TuyaOAuth2Driver';

module.exports = class TuyaOAuth2DriverSensorContact extends TuyaOAuth2DriverSensor {
  TUYA_DEVICE_CATEGORIES = [DEVICE_CATEGORIES.SECURITY_VIDEO_SURV.CONTACT_SENSOR] as const;

  onTuyaPairListDeviceProperties(
    device: TuyaDeviceResponse,
    specifications: TuyaDeviceSpecificationResponse,
  ): ListDeviceProperties {
    const props = super.onTuyaPairListDeviceProperties(device, specifications);

    // alarm_contact
    const hasDoorContactState = device.status.some(({ code }) => code === 'doorcontact_state');
    if (hasDoorContactState) {
      props.store.tuya_capabilities.push('doorcontact_state');
      props.capabilities.push('alarm_contact');
    }

    return props;
  }
};

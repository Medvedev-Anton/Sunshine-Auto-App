import { Script } from 'playcanvas';

class VehicleControl extends Script {
  initialize() {
    // Vehicle state
    this.speed = 0;
    this.maxSpeed = 0.5;
    this.acceleration = 0.02;
    this.deceleration = 0.01;
    this.steeringAngle = 0;
    this.maxSteeringAngle = Math.PI / 4; // 45 degrees
    this.steeringSpeed = 0.03;
    this.steeringReturnSpeed = 0.05;

    // Input state
    this.input = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };

    // Set up event listeners
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(event) {
    switch (event.key.toLowerCase()) {
      case 's':
        this.input.forward = true;
        break;
      case 'w':
        this.input.backward = true;
        break;
      case 'a':
        this.input.left = true;
        break;
      case 'd':
        this.input.right = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.key.toLowerCase()) {
      case 's':
        this.input.forward = false;
        break;
      case 'w':
        this.input.backward = false;
        break;
      case 'a':
        this.input.left = false;
        break;
      case 'd':
        this.input.right = false;
        break;
    }
  }

  update(dt) {
    // Handle acceleration
    if (this.input.forward) {
      this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    } else if (this.input.backward) {
      this.speed = Math.max(this.speed - this.acceleration, -this.maxSpeed / 2);
    } else {
      // Decelerate when no input
      if (this.speed > 0) {
        this.speed = Math.max(0, this.speed - this.deceleration);
      } else if (this.speed < 0) {
        this.speed = Math.min(0, this.speed + this.deceleration);
      }
    }

    // Handle steering
    if (this.input.left) {
      this.steeringAngle = Math.max(this.steeringAngle - this.steeringSpeed, -this.maxSteeringAngle);
    } else if (this.input.right) {
      this.steeringAngle = Math.min(this.steeringAngle + this.steeringSpeed, this.maxSteeringAngle);
    } else {
      // Return steering to center
      if (this.steeringAngle > 0) {
        this.steeringAngle = Math.max(0, this.steeringAngle - this.steeringReturnSpeed);
      } else if (this.steeringAngle < 0) {
        this.steeringAngle = Math.min(0, this.steeringAngle + this.steeringReturnSpeed);
      }
    }

    // Get vehicle's forward direction
    const forward = this.entity.forward;
    
    // Calculate movement
    const moveX = forward.x * this.speed;
    const moveZ = forward.z * this.speed;
    
    // Update position
    const pos = this.entity.getPosition();
    this.entity.setPosition(pos.x + moveX, pos.y, pos.z + moveZ);

    // Apply steering rotation
    if (Math.abs(this.speed) > 0.01) {
      const rotation = this.entity.getEulerAngles();
      rotation.y += this.steeringAngle * (this.speed / this.maxSpeed);
      this.entity.setEulerAngles(rotation);
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
}

export default VehicleControl; 
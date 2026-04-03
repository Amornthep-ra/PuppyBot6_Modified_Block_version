const dirIcon = Vue.prototype.$global.board.board_info.dir;
module.exports = {
    base_blocks: [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
        {
            name: 'PuppyBot',
            index: 1,
            color: '230',
            icon: `file:///${dirIcon}/static/cover.jpg`,
            blocks: [
                {
                    xml: `<sep gap="25"></sep><label text="1.คำสั่งสวิตซ์ SW1" web-class="main-content"></label>`
                },
                'sw1_press_select',
                'button_1_status',
                {
                    xml: `<sep gap="25"></sep><label text="2.คำสั่งเซ็นเซอร์" web-class="main-content"></label>`
                },
                'Light_Sensor',
                'Light_Sensor_F',
                {
                    xml: `<sep gap="25"></sep><label text="TCS(RGB) ตัวที่ 1 ต่อเข้า SDA1/SCL1 และตัวที่ 2 ต่อเข้า SDA2/SCL2" web-class="main-content"></label>`
                },

                {
                    xml:
                        `<block type="TCS_color_status">
                        <field name="POS">F</field>
                        <value name="_color">
                            <shadow type="math_number">
                                <field name="NUM">500</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'Ultrasonic_sensor',
                {
                    xml:
                        `<block type="INPUT_digital">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<sep gap="25"></sep><label text="3.บล็อกคำสั่ง/การอ่านค่าของ IMU " web-class="main-content"></label>`
                },
                {
                    xml:
                        `<block type="IMU_begin">
                            <field name="Mode">0</field>
                            <field name="pos_encoder">0</field>
                            <field name="S0">15</field>
                            <field name="S1">60</field>
                            <field name="S2">4</field>
                            <field name="S3">5</field>
                            <field name="S4">1</field>
                        </block>`
                },
                'IMU_resetTo180',
                'IMU_getData',
                'IMU_getData_Yaw',
                'IMU_direction_to_angle',
                {
                    xml: `<sep gap="25"></sep><label text="4.บล็อกคำสั่งของ Encoder" web-class="main-content"></label>`
                },
                'read_Encoder',
                'reset_Encoder',
                {
                    xml: `<sep gap="25"></sep><label text="5.บล็อกคำสั่งการเคลื่อนที่" web-class="main-content"></label>`
                },
                'IMU_TurnByAngle',
                {
                    xml:
                        `<block type="IMU_TurnPID">
                            <value name="S0">
                                <shadow type="math_number">
                                    <field name="NUM">90</field>
                                </shadow>
                            </value>
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">15</field>
                                </shadow>
                            </value>
                            <value name="S2">
                                <shadow type="math_number">
                                    <field name="NUM">60</field>
                                </shadow>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">5</field>
                                </shadow>
                            </value>
                            <value name="S4">
                                <shadow type="math_number">
                                    <field name="NUM">5</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="move_Go_Straight_Fix">
                            <field name="RUNMODE">ENC</field>
                            <value name="ANGLE">
                                <shadow type="math_number">
                                    <field name="NUM">180</field>
                                </shadow>
                            </value>
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="S2">
                                <shadow type="math_number">
                                    <field name="NUM">1000</field>
                                </shadow>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="S4">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="S5">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="IMU_moveStraightCurveStraight_Encoder">
                            <field name="BRAKE">FALSE</field>
                            <field name="STOP">TRUE</field>
                            <value name="S0">
                                <shadow type="math_number">
                                    <field name="NUM">1200</field>
                                </shadow>
                            </value>
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">55</field>
                                </shadow>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">0.8</field>
                                </shadow>
                            </value>
                            <value name="S4">
                                <shadow type="math_number">
                                    <field name="NUM">0.02</field>
                                </shadow>
                            </value>
                            <value name="S6">
                                <shadow type="math_number">
                                    <field name="NUM">3</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="IMU_moveStraightCurveTurn_Encoder">
                            <field name="CURVE_SLOWDOWN">1</field>
                            <field name="TURN_STYLE">0</field>
                            <field name="LOCK">TRUE</field>
                            <field name="STOP">TRUE</field>
                            <value name="S2">
                                <shadow type="math_number">
                                    <field name="NUM">45</field>
                                </shadow>
                            </value>
                            <value name="S7">
                                <shadow type="math_number">
                                    <field name="NUM">1.1</field>
                                </shadow>
                            </value>
                            <value name="S8">
                                <shadow type="math_number">
                                    <field name="NUM">22</field>
                                </shadow>
                            </value>
                            <value name="S9">
                                <shadow type="math_number">
                                    <field name="NUM">1.1</field>
                                </shadow>
                            </value>
                            <value name="S10">
                                <shadow type="math_number">
                                    <field name="NUM">0.03</field>
                                </shadow>
                            </value>
                            <value name="S11">
                                <shadow type="math_number">
                                    <field name="NUM">1.5</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="mecanum_slide_fix">
                            <field name="RUNMODE">ENC</field>
                            <value name="ANGLE">
                                <shadow type="math_number">
                                    <field name="NUM">180</field>
                                </shadow>
                            </value>
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="S2">
                                <shadow type="math_number">
                                    <field name="NUM">800</field>
                                </shadow>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="S4">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="S5">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="IMU_moveStraightPID_step">
                            <value name="S0">
                                <shadow type="math_number">
                                    <field name="NUM">180</field>
                                </shadow>
                            </value>
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="S2">
                              <block type="logic_compare">
                                <field name="OP">LT</field>
                                <value name="A">
                                  <block type="Light_Sensor" />
                                </value>
                                <value name="B">
                                  <shadow type="math_number">
                                    <field name="NUM">500</field>
                                  </shadow>
                                </value>
                              </block>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="S4">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                             <value name="S5">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml: `<sep gap="20"></sep><label text="บล็อกด้านล่างนี้ต้องใช้ใน loop / want loop" web-class="main-content"></label>`
                },
                {
                    xml:
                        `<block type="IMU_moveStraightDirection_noLoop">
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="S2">
                                <shadow type="math_number">
                                    <field name="NUM">180</field>
                                </shadow>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                             <value name="S5">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="move_straight_mode">
                            <field name="DIR">0</field>
                            <value name="ANGLE">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="SPEED">
                                <shadow type="math_number">
                                    <field name="NUM">40</field>
                                </shadow>
                            </value>
                            <value name="KP">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="KD">
                                <shadow type="math_number">
                                    <field name="NUM">0.25</field>
                                </shadow>
                            </value>
                            <field name="VAR">enc_FWD</field>
                        </block>`
                },
                {
                    xml:
                        `<block type="wantloop_mecanum_slide_fix">
                            <field name="direction">0</field>
                            <value name="ANGLE">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="S1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="S3">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="S4">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="S5">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>`
                },

                {
                    xml: `<sep gap="25"></sep><label text="6.บล็อกคำสั่งที่ใช้กับ While Loop" web-class="main-content"></label>`
                },
                {
                    xml:
                        `<block type="encoder_delta_lt_target">
      <value name="TARGET">
        <shadow type="math_number"><field name="NUM">1000</field></shadow>
      </value>
    </block>`
                },
                {
                    xml: `<sep gap="25"></sep><label text="7.บล็อกคำสั่งอื่นๆ" web-class="main-content"></label>`
                },
                {
                    xml: `
    <block type="knob_menu_n">
    <field name="pin">0</field>
    <field name="n">1</field>
    </block>
`},



            ]
        },
        //display
        {
            name: "Display",
            index: 2,
            color: "230",
            icon: "/static/icons/icons8_picture_96px_1.png",
            blocks: [
                "i2c128x64_create_image",
                {
                    xml:
                        `<block type="i2c128x64_display_image">
                                <value name="img">
                                    <block type="variables_get">
                                        <field name="VAR">img1</field>
                                    </block>
                                </value>
                                <value name="x">
                                    <shadow type="math_number">
                                        <field name="NUM">0</field>
                                    </shadow>
                                </value>
                                <value name="x">
                                    <shadow type="math_number">
                                        <field name="NUM">0</field>
                                    </shadow>
                                </value>
                                <value name="y">
                                    <shadow type="math_number">
                                        <field name="NUM">0</field>
                                    </shadow>
                                </value>
                                <value name="width">
                                    <shadow type="math_number">
                                        <field name="NUM">160</field>
                                    </shadow>
                                </value>
                                <value name="height">
                                    <shadow type="math_number">
                                        <field name="NUM">128</field>
                                    </shadow>
                                </value>
                            </block>`
                },
                "webcam_capture_to_file",
                "tft_display_setRotation",
                "tft_display_fillScreen",
                {
                    xml:
                        `<block type="tft_display_print">
                                    <value name="text">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="size">
                                        <shadow type="math_number">
                                            <field name="NUM">2</field>
                                        </shadow>
                                    </value>
                                </block>`
                },
                {
                    xml:
                        `<block type="tft_display_print2">
                                    <value name="text">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="size">
                                        <shadow type="math_number">
                                            <field name="NUM">2</field>
                                        </shadow>
                                    </value>
                                </block>`
                },
                {
                    xml:
                        `<block type="tft_display_draw_line">
                                    <value name="x0">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                    <value name="y0">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                    <value name="x1">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                    <value name="y1">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>`
                },
                {
                    xml:
                        `<block type="tft_display_draw_rect">
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                    <value name="width">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="height">
                                        <shadow type="math_number">
                                            <field name="NUM">30</field>
                                        </shadow>
                                    </value>
                                </block>`
                },
                {
                    xml:
                        `<block type="tft_display_draw_circle">
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">64</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">32</field>
                                        </shadow>
                                    </value>
                                    <value name="r">
                                        <shadow type="math_number">
                                            <field name="NUM">20</field>
                                        </shadow>
                                    </value>
                                </block>`
                },
                "basic_string"
            ]
        },
        //motor
        {
            name: 'Motor',
            index: 3,
            color: '230',
            //icon: "/static/icons/icons8_workflow_128px.png",
            icon: `file:///${dirIcon}/static/electric-motor.png`,
            blocks: [
                {
                    xml: `<sep gap="20"></sep><label text="1.บล็อกคำสั่งการใช้งานเซอร์โว(Servo)" web-class="main-content"></label>`
                },
                {
                    xml:
                        `<block type="PuppyBot_servo">
                        <value name="ch">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="angle">
                            <shadow type="math_number">
                                <field name="NUM">90</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="PuppyBot_servo_speed_control">
                        <value name="ch">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="servo_degree">
                            <shadow type="math_number">
                                <field name="NUM">90</field>
                            </shadow>
                        </value>
                        <value name="traget_degree">
                            <shadow type="math_number">
                                <field name="NUM">120</field>
                            </shadow>
                        </value>
                        <value name="Step">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="servo_speed">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<sep gap="20"></sep><label text="2.คำสั่งในการหยุดมอเตอร์" web-class="main-content"></label>`
                },
                {
                    xml:
                        `<block type="PuppyBot_stop_select">
                        <field name="TARGET">ALL</field>
                        <field name="MODE">NOW</field>
                        <value name="time">
                            <shadow type="math_number">
                                <field name="NUM">500</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<sep gap="20"></sep><label text="3.คำสั่งในการเคลื่อนที่ เดินหน้า(Forward) / ถอยหลัง(Backward)" web-class="main-content"></label>`
                },
                {
                    xml: `
    <block type="PuppyBot_drive_move">
      <field name="drive">2</field>
      <field name="dir">FWD</field>
      <value name="speed">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="delay_ms">
        <shadow type="math_number">
          <field name="NUM">1000</field>
        </shadow>
      </value>
      <field name="STOP_MODE">NO_STOP</field>
      <value name="stop_delay">
        <shadow type="math_number">
          <field name="NUM">200</field>
        </shadow>
      </value>
    </block>
  `
                },
                {
                    xml:
                        `<block type="PuppyBot_dual_motor_drive">
                        <field name="drive">2</field>
                        <field name="dir">FWD</field>
                        <value name="left_speed">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="right_speed">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="PuppyBot">
                        <value name="ch">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="dir">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="speed">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="PuppyBotmotor_Mecanum">
                        <value name="speed">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                    </block>`
                },

                {
                    xml: `<sep gap="20"></sep><label text="4.คำสั่งในการเลี้ยว spin = หมุนรอบตัวเอง / turn = เลี้ยว / ตีโค้ง / เปลี่ยนทิศ" web-class="main-content"></label>`
                },
                {
                    xml:
                        `<block type="PuppyBot_turn_spin_move">
                        <field name="drive">2</field>
                        <field name="MODE">TL</field>
                        <value name="speed">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                    </block>`
                },




            ]
        },
        //PID
        {
            name: 'PID',
            index: 4,
            color: '230',
            //icon: "/static/icons/icons8_workflow_128px.png",
            icon: `file:///${dirIcon}/static/PID.png`,
            blocks: [
                {
                    xml: `<sep gap="25"></sep><label text="1.ตั้งค่าการเชื่อมต่อเซ็นเซอร์ เริ่มจากซ้ายไปขวา" web-class="headline"></label>`
                },
                {
                    xml: `<sep gap="25"></sep><label text="2.ตั้งค่า Min = ค่าที่อ่านจากพื้นสีดำ" web-class="headline"></label>`
                },
                {
                    xml: `<sep gap="25"></sep><label text="3.ตั้งค่า Max = ค่าที่อ่านจากพื้นสีขาว" web-class="headline"></label>`
                },
                { xml: `<block type="PuppyBot_PID_setPin_select"><field name="SIDE">FRONT</field></block>` },
                { xml: `<block type="PuppyBot_PID_setline_color_select"><field name="SIDE">FRONT</field></block>` },
                { xml: `<block type="PuppyBot_PID_setmode_sensor_select"><field name="SIDE">FRONT</field></block>` },
                //   {xml:
                //         `<block type="set_Sensitive_Front_sensor">
                //               <value name="Sensitive">
                //                   <shadow type="math_number">
                //                       <field name="NUM">80</field>
                //                   </shadow>
                //               </value>

                //           </block>`
                // },
                {
                    xml:
                        `<block type="PuppyBot_PID_setMin_select">
                            <field name="SIDE">FRONT</field>
                            <value name="S0"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S1"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S3"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S4"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S5"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S6"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                            <value name="S7"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                        </block>`
                },
                {
                    xml:
                        `<block type="PuppyBot_PID_setMax_select">
                            <field name="SIDE">FRONT</field>
                            <value name="S0"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S1"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S2"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S3"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S4"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S5"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S6"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                            <value name="S7"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>
                        </block>`
                },
                {
                    xml:
                        `<block type="set_calibrate_sensor_select">
                            <field name="SIDE">FRONT</field>
                            <value name="Round">
                                <shadow type="math_number">
                                    <field name="NUM">2000</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="PuppyBot_Run_PID_select">
                            <field name="SIDE">FRONT</field>
                            <field name="Driver">0</field>
                            <field name="DIR">FWD</field>
                            <field name="CHECK_MODE">NO</field>
                            <value name="speed"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
                            <value name="KP"><shadow type="math_number"><field name="NUM">0.2</field></shadow></value>
                            <value name="KD"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                            <value name="sumSensor"><shadow type="math_number"><field name="NUM">200</field></shadow></value>
                        </block>`
                },
                {
                    xml:
                        `<block type="PuppyBot_Run_PD_V2_select">
                            <field name="SIDE">FRONT</field>
                            <field name="Driver">0</field>
                            <field name="DIR">FWD</field>
                            <value name="speed"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
                            <value name="KP"><shadow type="math_number"><field name="NUM">0.2</field></shadow></value>
                            <value name="KD"><shadow type="math_number"><field name="NUM">0.02</field></shadow></value>
                        </block>`
                },
                {
                    xml:
                        `<block type="PuppyBot_Run_PID_color_select">
                            <field name="SIDE">FRONT</field>
                            <field name="LINE_COLOR">0</field>
                            <field name="Driver">0</field>
                            <field name="CHECK_MODE">NO</field>
                            <value name="speed">
                                <shadow type="math_number">
                                    <field name="NUM">30</field>
                                </shadow>
                            </value>
                            <value name="KP">
                                <shadow type="math_number">
                                    <field name="NUM">0.2</field>
                                </shadow>
                            </value>
                            <value name="KD">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="sumSensor">
                                <shadow type="math_number">
                                    <field name="NUM">200</field>
                                </shadow>
                            </value>
                        </block>`
                },
                // {xml:`<block type="Read_Min_Front_Sensor"></block>`},


                {
                    xml:
                        `<block type="Read_Status_Sensor_select">
                            <field name="SIDE">FRONT</field>
                            <field name="Sensor_Pin">0</field>
                            <field name="line_color">0</field>
                        </block>`
                },
                {
                    xml:
                        `<block type="Read_Ref_Sensor_select">
                            <field name="SIDE">FRONT</field>
                            <field name="Sensor_Pin">0</field>
                        </block>`
                },

                {
                    xml:
                        `<block type="PID_readSumSensor_select">
                            <field name="SIDE">FRONT</field>
                        </block>`
                },
                {
                    xml:
                        `<block type="PID_readLine_select">
                            <field name="SIDE">FRONT</field>
                        </block>`
                },
                // {xml:
                //            `<block type="set_Sensitive_Back_sensor">
                //                  <value name="Sensitive">
                //                      <shadow type="math_number">
                //                          <field name="NUM">80</field>
                //                      </shadow>
                //                  </value>

                //              </block>`
                //    },



                //เพิ่มใหม่ 17/09/2025
                {
                    xml: `
    <block type="PID_follow_line_by_encoder">
      <field name="DRIVE">0</field>
      <field name="DIR">FWD</field>
      <field name="TIMEOUT_MODE">OFF</field>
      <value name="SPEED"><shadow type="math_number"><field name="NUM">40</field></shadow></value>
      <value name="KP"><shadow type="math_number"><field name="NUM">3</field></shadow></value>
      <value name="KD"><shadow type="math_number"><field name="NUM">0.25</field></shadow></value>
      <value name="ENC_CUR">
        <block type="read_Encoder"></block>
      </value>
      <value name="PULSES"><shadow type="math_number"><field name="NUM">1000</field></shadow></value>
      <value name="TIMEOUT_MS"><shadow type="math_number"><field name="NUM">1000</field></shadow></value>
    </block>
  `
                },
                {
                    xml: `
    <block type="PID_follow_line_cross">
      <field name="DRIVE">0</field>
      <field name="DIR">FWD</field>
      <field name="TIMEOUT_MODE">OFF</field>
      <value name="SPEED">
        <shadow type="math_number"><field name="NUM">40</field></shadow>
      </value>
      <value name="KP">
        <shadow type="math_number"><field name="NUM">3</field></shadow>
      </value>
      <value name="KD">
        <shadow type="math_number"><field name="NUM">0.25</field></shadow>
      </value>
      <value name="ENC_CUR">
        <block type="read_Encoder"></block>
      </value>
      <value name="SUM_THRESHOLD">
        <shadow type="math_number"><field name="NUM">200</field></shadow>
      </value>
      <value name="CROSS_COUNT">
        <shadow type="math_number"><field name="NUM">1</field></shadow>
      </value>
        <value name="EXTRA_PULSES">
          <shadow type="math_number"><field name="NUM">100</field></shadow>
        </value>
        <value name="STOP_DELAY">
          <shadow type="math_number"><field name="NUM">200</field></shadow>
        </value>
        <value name="TIMEOUT_MS">
          <shadow type="math_number"><field name="NUM">1000</field></shadow>
        </value>
        <field name="EXTRA_MODE">ENC</field>
      </block>
    `
                },
            ]
        },
        // //GPIO
        // {
        //     name : 'GPIO',
        //     index: 5,
        //     color : '230',
        //     icon : '/static/icons/icons8_electronics_96px.png',
        //     blocks : [
        //         {
        //             xml : 
        //             `<block type="io_setpin">
        //                 <value name="pin">
        //                     <shadow type="math_number">
        //                         <field name="NUM">25</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         },
        //         {
        //             xml : 
        //             `<block type="io_digital_read">
        //                 <value name="pin">
        //                     <shadow type="math_number">
        //                         <field name="NUM">32</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         },
        //         {
        //             xml : 
        //             `<block type="io_digital_write">
        //                 <value name="pin">
        //                     <shadow type="math_number">
        //                         <field name="NUM">33</field>
        //                     </shadow>
        //                 </value>
        //                 <value name="value">
        //                     <shadow type="math_number">
        //                         <field name="NUM">1</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         },                
        //         {
        //             xml : 
        //             `<block type="io_analog_read">
        //                 <value name="pin">
        //                     <shadow type="math_number">
        //                         <field name="NUM">36</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         },
        //         {
        //             xml : 
        //             `<block type="io_pwm_write">
        //                 <value name="pin">
        //                     <shadow type="math_number">
        //                         <field name="NUM">36</field>
        //                     </shadow>
        //                 </value>
        //                 <value name="value">
        //                     <shadow type="math_number">
        //                         <field name="NUM">128</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         },
        //         {
        //             xml : 
        //             `<block type="io_pulse_in">
        //                 <value name="pin">
        //                     <shadow type="math_number">
        //                         <field name="NUM">36</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         },
        //         'io_shift_in',
        //         {
        //             xml : 
        //             `<block type="io_shift_out">
        //                 <value name="data">
        //                     <shadow type="math_number">
        //                         <field name="NUM">127</field>
        //                     </shadow>
        //                 </value>
        //             </block>`
        //         }
        //     ]
        // },
        //Music  
        {
            name: "Music",
            index: 7,
            color: "330",
            icon: "/static/icons/SVG/c6.svg",
            blocks: [
                "music_note",
                "music_notes",
                {
                    xml:
                        `<block type="music_play_notes">
                              <value name="note">                    
                                  <block type="music_notes">
                                      <field name="notes">C4,B4,E4</field>
                                  </block>
                              </value>
                          </block>`
                },
                'music_song_mario_underworld',
                'music_song_jingle_bell',
                'music_song_cannon_rock'
                // 'music_rest',
                // 'music_scale',
                // 'music_set_volume',
                // 'music_get_volume'
            ]
        },
        //Time
        {
            name: 'Time',
            color: '230',
            index: 6,
            icon: '/static/icons/icons8_Story_Time_96px.png',
            blocks: [
                {
                    xml:
                        `<block type="time_delay">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">500</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'time_millis',
                'time_micros'
            ]
        },
        //Variables
        {
            name: 'Variables',
            index: 8,
            color: '230',
            icon: '/static/icons/icons8_variable_96px.png',
            custom: 'VARIABLE'
        },
        //Math
        {
            name: 'Math',
            index: 9,
            color: '230',
            icon: '/static/icons/calculator.png',
            blocks: [
                {
                    xml:
                        `<block type="kb_abs">
                        <value name="X">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'math_number',
                {
                    xml:
                        `<block type="math_arithmetic">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="math_variables_set">
                        <value name="VALUE">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'math_variables_get',
                {
                    xml:
                        `<block type="math_pow">
                        <value name="NUM1">
                            <shadow type="math_number">
                                <field name="NUM">2</field>
                            </shadow>
                        </value>
                        <value name="NUM2">
                            <shadow type="math_number">
                                <field name="NUM">3</field>
                            </shadow>
                        </value>
                    </block>`
                },
                /*'math_sqrt',*/
                {
                    xml:
                        `<block type="math_single">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">9</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="math_trig">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">90</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="math_round">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">1.2</field>
                            </shadow>
                        </value>
                    </block>`
                },
                /*'math_min',
                'math_max',
                'math_map',*/
                'math_random_int',
                {
                    xml:
                        `<block type="math_number_property">
                        <value name="NUMBER_TO_CHECK">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                    </block>`
                },
            ]
        },
        //Logic
        {
            name: 'Logic',
            index: 10,
            color: '230',
            icon: '/static/icons/icons8_serial_tasks_96px.png',
            blocks: [
                'controls_if',
                {
                    xml: '<block type="controls_if"><mutation else="1"></mutation></block>'
                },
                'logic_compare',
                'logic_operation',
                'logic_negate',
                'logic_boolean',
            ]
        },
        //Loops
        {
            name: 'Loops',
            index: 11,
            color: '230',
            icon: '/static/icons/icons8_repeat_96px.png',
            blocks: [
                'basic_forever',
                'controls_whileUntil',

                {
                    xml:
                        `<block type="basic_forever_timeout">
                        <value name="timer">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="basic_forever_count">
                        <value name="timer">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml:
                        `<block type="controls_for">
                        <value name="FROM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="TO">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="BY">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'controls_flow_statements',
            ]
        },
        //Advanced
        {
            name: 'Advanced',
            index: 12,
            color: '195',
            icon: '/static/icons/icons8_hacker_128px.png',
            blocks: [
                {
                    type: 'category',
                    name: 'Functions',
                    icon: '/static/icons/icons8_module_96px.png',
                    custom: 'PROCEDURE'
                },
                /*{
                    type : 'category',
                    name : 'Tasks',
                    icon : '/static/icons/icons8_exercise_96px.png',
                    blocks : [
                        'create task',
                        'start task',
                        'stop task'
                    ]
                },*/
                /*{
                    type : 'category',
                    name : 'Arrays',
                    icon : '/static/icons/icons8_stack_96px.png',
                    blocks : [
                        'lists_create_empty',
                        'lists_repeat',
                        'lists_reverse',
                        'lists_isEmpty',
                        'lists_length',
                        'lists_create_with',
                        'lists_indexOf',
                        'lists_getIndex',
                        'lists_setIndex',
                        'lists_getSublist',
                        'lists_sort',
                        'lists_split',
                    ]
                },*/
                {
                    type: 'category',
                    name: 'Text',
                    icon: '/static/icons/icons8_text_color_96px.png',
                    blocks: [
                        'basic_string',
                        {
                            xml:
                                `<block type="text_length">
                                <value name="VALUE">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        'text_join',
                        {
                            xml:
                                `<block type="text_append">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="text_isEmpty">
                                    <value name="VALUE">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>                                    
                                </block>`
                        },
                        {
                            xml:
                                `<block type="text_indexOf">
                                <value name="VALUE">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="text_charAt">
                                <value name="VALUE">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="text_getSubstring">
                                <value name="STRING">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="text_changeCase">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="text_trim">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="text_replace">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        //'text_compare',
                        //'text_parse_int'
                    ]
                },

                {
                    type: 'category',
                    name: 'Custom',
                    icon: '/static/icons/icons8_bluetooth_2_96px.png',
                    blocks: [
                        {
                            xml:
                                `<block type="EditTextCode">
                                <value name="Text">
                                    <shadow type="basic_string">
                                        <field name="VALUE">int Prince = 1;</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="EditTextCode_INPUT">
                                <value name="Text">
                                    <shadow type="basic_string">
                                        <field name="VALUE">ADC(1)</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        {
                            xml:
                                `<block type="BlockComment">
                                <value name="Text">
                                    <shadow type="basic_string">
                                        <field name="VALUE">comment here </field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                    ]
                },


                {
                    type: 'category',
                    name: 'Serial',
                    icon: '/static/icons/SVG/13.svg',
                    blocks: [
                        'serial_usb_init',
                        'serial_hardware_init',
                        'serial_available',
                        {
                            xml:
                                `<block type="serial_write_data">
                                    <value name="text">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                </block>`
                        },
                        'serial_write_newline',
                        'serial_read_line',
                        'serial_read_until',
                        'basic_string'
                    ]
                }
            ]
        }
    ]
}












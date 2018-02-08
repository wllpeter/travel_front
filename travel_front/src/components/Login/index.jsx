/**
 * @description 登录页
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import 'antd/lib/grid/style';
import {Tip, Input, Button, Checkbox, Validate} from 'mtui/index';
import {getIdentifyingCode, login} from '../../services/Login/login';
import {setSession, getSession, setLocal, getLocal, remove} from '../../utils/storage';
import './style.scss';

const ValidateGroup = Validate.ValidateGroup;

export default class Login extends Component {
    constructor(props) {
        super(props);
        let temp = getLocal('temp');
        if (temp) {
            temp.codeInput = '';
        }
        this.state = {
            codeShow: false, // 是否需要输入验证码
            codeImage: '', // 验证码图片
            codeValue: '', // 验证码的值
            temp: temp || {
                loginName: '',
                password: '',
                codeInput: ''
            },
            remember: !!temp
        };
    }

    componentDidMount() {
        if (getSession('codeNum') >= 5) {
            this.setState({
                codeShow: true
            }, () => {
                this.getCode();
            });
        }
    }

    handleChange(e, key) {
        let temp = this.state.temp;
        temp[key] = e.target.value;
        this.setState({temp: temp});
    }

    login(data) {
        if (data.success) {
            let {temp, codeShow, codeValue, remember} = this.state;
            // 如果需要填写验证码
            if (codeShow) {
                // 输入的验证码不正确
                if (codeValue !== temp.codeInput) {
                    Tip.error('请正确输入验证码');
                    this.getCode();
                    temp.codeInput = '';
                    this.setState({
                        temp: temp
                    });
                    return;
                }
            }
            login(temp).then(res => {
                // 登录成功
                setSession('user', res.sysUser);
                remove('codeNum');
                if (remember) {
                    setLocal('temp', temp);
                } else {
                    remove('temp');
                }
                browserHistory.push('/');
            }).catch(res => {
                Tip.error(res.info);
                // 用户名和密码连续输入错误时
                if (!getSession('codeNum')) {
                    setSession('codeNum', 1);
                } else {
                    let codeNum = getSession('codeNum');
                    codeNum++;
                    setSession('codeNum', codeNum);
                    if (codeNum >= 5) {
                        this.setState({
                            codeShow: true
                        });
                        this.getCode();
                    }
                }
            });
        }
    }

    // 获取验证码
    getCode() {
        getIdentifyingCode({}).then(res => {
            this.setState({
                codeImage: res.image,
                codeValue: res.value
            });
        });
    }

    rememberChange() {
        let {remember} = this.state;
        remember = !remember;
        this.setState({remember: remember});
    }

    render() {
        let {codeImage, temp, codeShow, remember} = this.state;
        return <div className="login-bg">
            <div className="login-box">
                <div className="login-title"></div>
                <ValidateGroup submit={this.login.bind(this)}>
                    <div className="login-input">
                        <Validate exgs={[{regs: 'notempty', type: 'danger', info: '账号不能为空！'}]}>
                            <Input placeholder="账号" onChange={e => this.handleChange.bind(this)(e, 'loginName')}
                                   value={temp.loginName} prefix={<i className="iconfont icon-user"></i>}/>
                        </Validate>

                        <Validate exgs={[{regs: 'notempty', type: 'danger', info: '密码不能为空！'}]}>
                            <Input onChange={e => this.handleChange.bind(this)(e, 'password')} value={this.state.val}
                                   value={temp.password} placeholder="密码"
                                   type="password" prefix={<i className="iconfont icon-password"></i>}/>
                        </Validate>
                        {
                            codeShow && <div className="code-box">
                                <Validate exgs={[{regs: 'notempty', type: 'danger', info: '请输入验证码'}]}>
                                    <Input placeholder="验证码"
                                           onChange={e => this.handleChange.bind(this)(e, 'codeInput')}
                                           maxLength="4" value={temp.codeInput}
                                           prefix={<i className="iconfont icon-code"></i>}/>
                                </Validate>
                                <div className="code" onClick={this.getCode.bind(this)} title="点击刷新">
                                    <img src={codeImage} alt="验证码"/>
                                </div>
                            </div>
                        }
                        <Checkbox onChange={this.rememberChange.bind(this)} checked={remember}>记住密码</Checkbox>
                        <Button htmlType="submit" type="primary">
                            登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                    </div>
                </ValidateGroup>
            </div>
        </div>;
    }
}
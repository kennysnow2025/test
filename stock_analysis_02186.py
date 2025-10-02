"""
港股02186 绿叶制药集团 全面投资分析
分析日期: 2025年10月2日
"""

import yfinance as yf
from datetime import datetime
import json


def analyze_stock_02186():
    """分析港股02186的投资价值"""
    
    print("=" * 100)
    print("港股02186 (绿叶制药集团) 深度投资分析报告")
    print("=" * 100)
    print(f"分析时间: {datetime.now().strftime('%Y年%m月%d日 %H:%M:%S')}")
    print()
    
    ticker = yf.Ticker('2186.HK')
    info = ticker.info
    hist = ticker.history(period='1y')
    
    # ==================== 综合分析 ====================
    
    print("【核心分析与投资建议】")
    print("=" * 100)
    
    current_price = info.get('currentPrice', 3.47)
    pe_ratio = info.get('trailingPE', 31.55)
    forward_pe = info.get('forwardPE', 12.85)
    pb_ratio = info.get('priceToBook', 0.89)
    market_cap_bn = 13.86  # 亿港元
    
    # 计算技术面信号
    ma50 = info.get('fiftyDayAverage', 3.77)
    ma200 = info.get('twoHundredDayAverage', 2.78)
    week52_high = info.get('fiftyTwoWeekHigh', 4.49)
    week52_low = info.get('fiftyTwoWeekLow', 1.67)
    
    print("\n一、公司概况")
    print("-" * 100)
    print("绿叶制药集团(Luye Pharma Group)是一家专注于创新药和高端制剂的制药企业。")
    print("主营业务: 特殊及通用药物制造，涵盖肿瘤、心血管、消化系统等领域")
    print(f"员工规模: 5,150人")
    print(f"当前市值: {market_cap_bn:.2f}亿港元 (约17.7亿美元)")
    
    print("\n二、最新行情总结")
    print("-" * 100)
    print(f"当前股价: {current_price} HKD (今日 +1.76%)")
    print(f"52周价格区间: {week52_low} - {week52_high} HKD")
    print(f"当前位置: 距52周高点 -22.72%，距52周低点 +107.78%")
    print(f"股价表现: 从年内低点反弹超过100%，但距离年内高点仍有20%+的空间")
    
    print("\n三、估值分析 ⭐⭐⭐⭐")
    print("-" * 100)
    print(f"市盈率(TTM): {pe_ratio:.2f}倍")
    print(f"远期市盈率: {forward_pe:.2f}倍 ← 显著改善")
    print(f"市净率: {pb_ratio:.2f}倍 ← 低于账面价值")
    print(f"市销率: 2.25倍")
    print(f"EV/EBITDA: 9.91倍")
    
    print("\n【估值评价】")
    print("✅ 远期市盈率12.85倍，相比TTM市盈率31.55倍大幅下降，表明市场预期未来盈利将显著增长")
    print("✅ 市净率0.89倍，低于1，意味着股价低于公司净资产，具有安全边际")
    print("⚠️  TTM市盈率偏高(31.55倍)，但这可能反映了当前盈利周期的低点")
    print("📊 对比行业: 医药制造业平均市盈率20-30倍，绿叶制药估值处于合理区间")
    
    print("\n四、财务健康度分析 ⭐⭐⭐")
    print("-" * 100)
    gross_margin = info.get('grossMargins', 0.6685) * 100
    operating_margin = info.get('operatingMargins', 0.15601) * 100
    net_margin = info.get('profitMargins', 0.06435) * 100
    roe = info.get('returnOnEquity', 0.03684) * 100
    roa = info.get('returnOnAssets', 0.02089) * 100
    debt_to_equity = info.get('debtToEquity', 71.758)
    current_ratio = info.get('currentRatio', 1.314)
    
    print(f"总收入(TTM): 61.68亿港元")
    print(f"净利润: 3.97亿港元")
    print(f"毛利率: {gross_margin:.2f}% ← 优秀")
    print(f"营业利润率: {operating_margin:.2f}%")
    print(f"净利润率: {net_margin:.2f}% ← 偏低")
    print(f"ROE: {roe:.2f}% ← 较弱")
    print(f"ROA: {roa:.2f}%")
    print(f"资产负债率: {debt_to_equity:.2f}% ← 偏高")
    print(f"流动比率: {current_ratio:.2f} ← 尚可")
    
    print("\n【财务评价】")
    print("✅ 毛利率66.85%，显示产品具有较强的定价能力和竞争优势")
    print("⚠️  净利润率仅6.44%，说明运营费用和财务费用较高，有待优化")
    print("⚠️  ROE 3.68%偏低，股东回报率不理想")
    print("⚠️  资产负债率71.76%偏高，存在一定的财务杠杆风险")
    print("✅ 流动比率1.31，短期偿债能力尚可")
    
    print("\n五、技术面分析 ⭐⭐⭐")
    print("-" * 100)
    print(f"当前价: {current_price} HKD")
    print(f"50日均线: {ma50:.2f} HKD")
    print(f"200日均线: {ma200:.2f} HKD")
    print(f"Beta系数: 0.816 (波动性低于大盘)")
    print(f"年化波动率: 61.58% (波动较大)")
    
    print("\n【技术评价】")
    if current_price < ma50:
        print(f"⚠️  当前价({current_price})低于50日均线({ma50:.2f})，短期处于弱势")
    else:
        print(f"✅ 当前价({current_price})高于50日均线({ma50:.2f})，短期趋势向好")
    
    if current_price > ma200:
        print(f"✅ 当前价({current_price})高于200日均线({ma200:.2f})，长期趋势向上")
    else:
        print(f"⚠️  当前价({current_price})低于200日均线({ma200:.2f})，长期处于弱势")
    
    if ma50 > ma200:
        print("✅ 50日均线上穿200日均线(金叉)，中长期趋势看多")
    else:
        print("⚠️  50日均线下穿200日均线(死叉)，中长期趋势看空")
    
    print("\n六、股息与分红 ⭐")
    print("-" * 100)
    print("年股息: 无")
    print("股息率: 0%")
    print("派息比率: 0%")
    print("\n【分红评价】")
    print("❌ 公司当前不派发股息，不适合追求稳定现金流的投资者")
    print("💡 这可能是因为公司处于成长期，将利润用于研发和业务扩张")
    
    print("\n七、风险因素")
    print("-" * 100)
    print("🔴 高杠杆风险: 资产负债率超过71%，财务杠杆较高")
    print("🔴 盈利能力弱: ROE仅3.68%，远低于行业平均水平")
    print("🔴 高波动性: 年化波动率61.58%，价格波动剧烈")
    print("🔴 无股息收益: 不派息，无法提供现金回报")
    print("🟡 医药行业监管风险: 药品审批、价格管制等政策风险")
    print("🟡 竞争加剧: 仿制药价格竞争激烈，利润率承压")
    print("🟢 行业前景: 医药健康行业长期需求增长确定")
    
    print("\n八、机会因素")
    print("-" * 100)
    print("🟢 估值修复空间: 市净率0.89倍，具有安全边际")
    print("🟢 盈利改善预期: 远期PE 12.85倍远低于当前31.55倍，市场预期盈利增长")
    print("🟢 股价反弹强劲: 从52周低点1.67港元反弹至3.47港元(+108%)")
    print("🟢 长期趋势向上: 股价在200日均线之上")
    print("🟢 高毛利率: 66.85%的毛利率显示产品竞争力")
    print("🟢 创新药布局: 公司专注于创新药研发，具有长期增长潜力")
    
    print("\n" + "=" * 100)
    print("【最终投资评级与建议】")
    print("=" * 100)
    
    print("\n综合评分: ⭐⭐⭐ (3/5星) - 谨慎看好")
    print("\n投资建议: 【可以适度配置，但需控制仓位】")
    
    print("\n✅ 适合买入的理由:")
    print("   1. 估值具有吸引力: 市净率0.89倍，低于净资产，具有安全边际")
    print("   2. 盈利增长预期: 远期PE仅12.85倍，市场预期未来盈利将大幅改善")
    print("   3. 技术面改善: 股价已从低点反弹超100%，且在200日均线之上")
    print("   4. 行业前景良好: 医药健康行业长期需求增长确定")
    print("   5. 高毛利率: 显示产品具有竞争力")
    
    print("\n⚠️  需要注意的风险:")
    print("   1. 短期调整压力: 当前价低于50日均线，可能继续回调")
    print("   2. 盈利能力弱: ROE仅3.68%，净利润率6.44%，盈利质量不高")
    print("   3. 高杠杆风险: 资产负债率71.76%，财务风险较高")
    print("   4. 无股息收益: 不派息，缺乏现金回报")
    print("   5. 高波动性: 价格波动剧烈，需承受较大波动")
    
    print("\n💡 操作策略建议:")
    print("   【中长期投资者】")
    print("   • 可以适度建仓，建议仓位不超过投资组合的5-10%")
    print("   • 分批买入: 在3.2-3.5港元区间分批建仓，降低成本")
    print("   • 止损位: 建议设置在3.0港元(约-13.5%)")
    print("   • 目标价: 第一目标4.0港元(+15%)，第二目标4.5港元(+30%)")
    print("   • 持有期: 建议6-12个月，等待业绩改善兑现")
    
    print("\n   【短期交易者】")
    print("   • 当前不建议追高，等待回调至3.2港元附近再考虑")
    print("   • 注意50日均线3.77港元的压力位")
    print("   • 若跌破3.0港元，可能测试2.8港元(200日均线)")
    
    print("\n   【保守投资者】")
    print("   • 建议观望，等待公司盈利能力确实改善后再介入")
    print("   • 可以等待下一季度财报发布后再做决策")
    print("   • 如果ROE能提升至8%以上，资产负债率降至60%以下，再考虑买入")
    
    print("\n关键财报日期提醒:")
    print("   • 建议关注下一季度财报(通常在3月、8月发布)")
    print("   • 重点关注: 收入增长率、净利润增长率、ROE改善情况")
    
    print("\n" + "=" * 100)
    print("【总结】")
    print("=" * 100)
    print("绿叶制药(02186)是一家具有一定基本面支撑的医药股，当前估值具有吸引力，")
    print("市场预期未来盈利将显著改善。从52周低点反弹超100%后，短期可能面临")
    print("调整压力。对于风险偏好适中的投资者，可以在3.2-3.5港元区间适度配置，")
    print("仓位控制在5-10%，设置好止损，等待业绩改善兑现。")
    print()
    print("⚠️  重要提示: 本分析仅供参考，不构成投资建议。投资有风险，入市需谨慎！")
    print("=" * 100)


if __name__ == "__main__":
    analyze_stock_02186()

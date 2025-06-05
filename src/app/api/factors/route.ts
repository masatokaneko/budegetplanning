import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 仮のデータストア（後でデータベースに置き換え）
let factors = [
  {
    id: '1',
    code: 'FAC001',
    name: '原材料費上昇',
    category: 'market',
    description: '原材料の価格上昇による影響',
    impact: 'negative',
    isActive: true,
  },
  {
    id: '2',
    code: 'FAC002',
    name: '生産性向上',
    category: 'internal',
    description: '製造プロセスの改善による影響',
    impact: 'positive',
    isActive: true,
  },
]

// GET: 要因一覧の取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const impact = searchParams.get('impact')
  const isActive = searchParams.get('isActive')

  let filteredFactors = [...factors]

  if (category) {
    filteredFactors = filteredFactors.filter(factor => factor.category === category)
  }

  if (impact) {
    filteredFactors = filteredFactors.filter(factor => factor.impact === impact)
  }

  if (isActive !== null) {
    filteredFactors = filteredFactors.filter(factor => factor.isActive === (isActive === 'true'))
  }

  return NextResponse.json(filteredFactors)
}

// POST: 新規要因の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.code || !body.name || !body.category || !body.impact) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // コードの重複チェック
    if (factors.some(factor => factor.code === body.code)) {
      return NextResponse.json(
        { error: 'この要因コードは既に使用されています' },
        { status: 400 }
      )
    }

    const newFactor = {
      id: String(factors.length + 1),
      code: body.code,
      name: body.name,
      category: body.category,
      description: body.description,
      impact: body.impact,
      isActive: body.isActive ?? true,
    }

    factors.push(newFactor)

    return NextResponse.json(newFactor, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// PUT: 要因の更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.id || !body.code || !body.name || !body.category || !body.impact) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    const index = factors.findIndex(factor => factor.id === body.id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定された要因が見つかりません' },
        { status: 404 }
      )
    }

    // コードの重複チェック（自身を除く）
    if (factors.some(factor => factor.code === body.code && factor.id !== body.id)) {
      return NextResponse.json(
        { error: 'この要因コードは既に使用されています' },
        { status: 400 }
      )
    }

    factors[index] = {
      ...factors[index],
      code: body.code,
      name: body.name,
      category: body.category,
      description: body.description,
      impact: body.impact,
      isActive: body.isActive,
    }

    return NextResponse.json(factors[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// DELETE: 要因の削除
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'IDが指定されていません' },
        { status: 400 }
      )
    }

    const index = factors.findIndex(factor => factor.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定された要因が見つかりません' },
        { status: 404 }
      )
    }

    factors = factors.filter(factor => factor.id !== id)

    return NextResponse.json({ message: '削除が完了しました' })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 
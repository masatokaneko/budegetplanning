import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 仮のデータストア（後でデータベースに置き換え）
let accounts = [
  {
    id: '1',
    code: 'ACC001',
    name: '人件費',
    category: 'expense',
    description: '従業員の給与・賞与等',
    isActive: true,
  },
  {
    id: '2',
    code: 'ACC002',
    name: '売上高',
    category: 'income',
    description: '商品・サービスの売上',
    isActive: true,
  },
]

// GET: 勘定科目一覧の取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const isActive = searchParams.get('isActive')

  let filteredAccounts = [...accounts]

  if (category) {
    filteredAccounts = filteredAccounts.filter(account => account.category === category)
  }

  if (isActive !== null) {
    filteredAccounts = filteredAccounts.filter(account => account.isActive === (isActive === 'true'))
  }

  return NextResponse.json(filteredAccounts)
}

// POST: 新規勘定科目の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.code || !body.name || !body.category) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // コードの重複チェック
    if (accounts.some(account => account.code === body.code)) {
      return NextResponse.json(
        { error: 'この科目コードは既に使用されています' },
        { status: 400 }
      )
    }

    const newAccount = {
      id: String(accounts.length + 1),
      code: body.code,
      name: body.name,
      category: body.category,
      description: body.description,
      isActive: body.isActive ?? true,
    }

    accounts.push(newAccount)

    return NextResponse.json(newAccount, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// PUT: 勘定科目の更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.id || !body.code || !body.name || !body.category) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    const index = accounts.findIndex(account => account.id === body.id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定された勘定科目が見つかりません' },
        { status: 404 }
      )
    }

    // コードの重複チェック（自身を除く）
    if (accounts.some(account => account.code === body.code && account.id !== body.id)) {
      return NextResponse.json(
        { error: 'この科目コードは既に使用されています' },
        { status: 400 }
      )
    }

    accounts[index] = {
      ...accounts[index],
      code: body.code,
      name: body.name,
      category: body.category,
      description: body.description,
      isActive: body.isActive,
    }

    return NextResponse.json(accounts[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// DELETE: 勘定科目の削除
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

    const index = accounts.findIndex(account => account.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定された勘定科目が見つかりません' },
        { status: 404 }
      )
    }

    accounts = accounts.filter(account => account.id !== id)

    return NextResponse.json({ message: '削除が完了しました' })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 